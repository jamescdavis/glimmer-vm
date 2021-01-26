import { Core, Dict } from '@glimmer/interfaces';
import { dict } from '@glimmer/util';

export abstract class SymbolTable {
  static top(locals: string[]): ProgramSymbolTable {
    return new ProgramSymbolTable(locals);
  }

  abstract has(name: string): boolean;
  abstract get(name: string): [symbol: number, isRoot: boolean];

  abstract getLocalsMap(): Dict<number>;
  abstract getEvalInfo(): Core.EvalInfo;

  abstract allocateFree(name: string): number;
  abstract allocateNamed(name: string): number;
  abstract allocateBlock(name: string): number;
  abstract allocate(identifier: string): number;

  abstract setHasEval(): void;

  child(locals: string[]): BlockSymbolTable {
    let symbols = locals.map((name) => this.allocate(name));
    return new BlockSymbolTable(this, locals, symbols);
  }
}

export class ProgramSymbolTable extends SymbolTable {
  constructor(private templateLocals: string[]) {
    super();
  }

  public symbols: string[] = [];
  public upvars: string[] = [];

  private size = 1;
  private named = dict<number>();
  private blocks = dict<number>();
  private usedTemplateLocals: string[] = [];

  #hasEval = false;

  getUsedTemplateLocals(): string[] {
    return this.usedTemplateLocals;
  }

  setHasEval(): void {
    this.#hasEval = true;
  }

  get hasEval(): boolean {
    return this.#hasEval;
  }

  has(name: string): boolean {
    return this.templateLocals.indexOf(name) !== -1;
  }

  get(name: string): [number, boolean] {
    let index = this.usedTemplateLocals.indexOf(name);

    if (index !== -1) {
      return [index, true];
    }

    index = this.usedTemplateLocals.length;
    this.usedTemplateLocals.push(name);
    return [index, true];
  }

  getLocalsMap(): Dict<number> {
    return dict();
  }

  getEvalInfo(): Core.EvalInfo {
    let locals = this.getLocalsMap();
    return Object.keys(locals).map((symbol) => locals[symbol]);
  }

  allocateFree(name: string): number {
    let index = this.upvars.indexOf(name);

    if (index !== -1) {
      return index;
    }

    index = this.upvars.length;
    this.upvars.push(name);
    return index;
  }

  allocateNamed(name: string): number {
    let named = this.named[name];

    if (!named) {
      named = this.named[name] = this.allocate(name);
    }

    return named;
  }

  allocateBlock(name: string): number {
    if (name === 'inverse') {
      name = 'else';
    }

    let block = this.blocks[name];

    if (!block) {
      block = this.blocks[name] = this.allocate(`&${name}`);
    }

    return block;
  }

  allocate(identifier: string): number {
    this.symbols.push(identifier);
    return this.size++;
  }
}

export class BlockSymbolTable extends SymbolTable {
  constructor(private parent: SymbolTable, public symbols: string[], public slots: number[]) {
    super();
  }

  get locals(): string[] {
    return this.symbols;
  }

  has(name: string): boolean {
    return this.symbols.indexOf(name) !== -1 || this.parent.has(name);
  }

  get(name: string): [number, boolean] {
    let slot = this.symbols.indexOf(name);
    return slot === -1 ? this.parent.get(name) : [this.slots[slot], false];
  }

  getLocalsMap(): Dict<number> {
    let dict = this.parent.getLocalsMap();
    this.symbols.forEach((symbol) => (dict[symbol] = this.get(symbol)[0]));
    return dict;
  }

  getEvalInfo(): Core.EvalInfo {
    let locals = this.getLocalsMap();
    return Object.keys(locals).map((symbol) => locals[symbol]);
  }

  setHasEval(): void {
    this.parent.setHasEval();
  }

  allocateFree(name: string): number {
    return this.parent.allocateFree(name);
  }

  allocateNamed(name: string): number {
    return this.parent.allocateNamed(name);
  }

  allocateBlock(name: string): number {
    return this.parent.allocateBlock(name);
  }

  allocate(identifier: string): number {
    return this.parent.allocate(identifier);
  }
}
