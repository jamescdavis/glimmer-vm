import { Operand, SerializedTemplateBlock, SerializedInlineBlock } from './compile';
import { CompileMode } from './compile/encoder';
import ComponentCapabilities from './component-capabilities';
import { Option } from './core';
import { ConstantPool, SerializedHeap, SyntaxCompilationContext } from './program';
import { CompileTimeResolverDelegate } from './serialize';
import { BlockSymbolTable, ProgramSymbolTable, SymbolTable } from './tier1/symbol-table';
import { TemplateMeta } from './runtime';

export type CompilableProgram = CompilableTemplate<ProgramSymbolTable>;
export type CompilableBlock = CompilableTemplate<BlockSymbolTable>;

export interface LayoutWithContext<R> {
  readonly id?: Option<string>;
  readonly block: SerializedTemplateBlock;
  readonly referrer: TemplateMeta<R>;
  readonly asPartial?: boolean;
}

export interface BlockWithContext<R> {
  readonly block: SerializedInlineBlock;
  readonly containingLayout: LayoutWithContext<TemplateMeta & R>;
}

/**
 * Environment specific template.
 */
export interface Template<R extends TemplateMeta = TemplateMeta> {
  /**
   * Template identifier, if precompiled will be the id of the
   * precompiled template.
   */
  id: string;

  /**
   * Template meta (both compile time and environment specific).
   */
  referrer: R;

  hasEval: boolean;

  /**
   * Symbols computed at compile time.
   */
  symbols: string[];

  // internal casts, these are lazily created and cached
  asLayout(): CompilableProgram;
  asPartial(): CompilableProgram;
  asWrappedLayout(): CompilableProgram;
}

export interface STDLib {
  main: number;
  'cautious-append': number;
  'trusting-append': number;
}

export type SerializedStdlib = [number, number, number];

export type STDLibName = keyof STDLib;

export type CompilerBuffer = Array<Operand>;

export interface ResolvedLayout {
  handle: number;
  capabilities: ComponentCapabilities;
  compilable: Option<CompilableProgram>;
}

export interface NamedBlocks {
  get(name: string): Option<CompilableBlock>;
  has(name: string): boolean;
  with(name: string, block: Option<CompilableBlock>): NamedBlocks;
  hasAny: boolean;
}

export interface ContainingMetadata {
  asPartial: boolean;
  evalSymbols: Option<string[]>;
  referrer: TemplateMeta;
  size: number;
}

export interface CompilerArtifacts {
  heap: SerializedHeap;
  constants: ConstantPool;
}

export interface CompileTime {
  readonly resolver: CompileTimeResolverDelegate;
  readonly mode: CompileMode;
}

export interface Unhandled {
  'not-handled': true;
}

export interface CompilableTemplate<S extends SymbolTable = SymbolTable> {
  symbolTable: S;
  compile(context: SyntaxCompilationContext): number;
}
