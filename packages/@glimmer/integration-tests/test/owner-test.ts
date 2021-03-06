import { ResolvedComponentDefinition } from '@glimmer/interfaces';
import {
  test,
  suite,
  EmberishCurlyComponent,
  RenderTest,
  JitRenderDelegate,
  createTemplate,
  TestJitRuntimeResolver,
} from '..';

class OwnerJitRuntimeResolver extends TestJitRuntimeResolver {
  lookupComponent(name: string, owner: () => void): ResolvedComponentDefinition | null {
    if (typeof owner === 'function') owner();

    return super.lookupComponent(name, owner);
  }
}

class OwnerJitRenderDelegate extends JitRenderDelegate {
  protected resolver = new OwnerJitRuntimeResolver(this.registry);
}

class OwnerTest extends RenderTest {
  static suiteName = '[owner]';

  declare delegate: OwnerJitRenderDelegate;

  @test
  'owner can be used per-template in compile time resolver'(assert: Assert) {
    class FooBar extends EmberishCurlyComponent {
      layout = createTemplate('<FooBaz/>')(() => {
        assert.step('foo-bar owner called');
      });
    }

    class FooBaz extends EmberishCurlyComponent {
      layout = createTemplate('<FooQux/>')(() => {
        assert.step('foo-baz owner called');
      });
    }

    this.delegate.registerComponent('Curly', 'Curly', 'FooBar', null, FooBar);
    this.delegate.registerComponent('Curly', 'Curly', 'FooBaz', null, FooBaz);
    this.delegate.registerComponent('TemplateOnly', 'TemplateOnly', 'FooQux', 'testing');

    this.render('<FooBar/>');

    assert.verifySteps(['foo-bar owner called', 'foo-baz owner called'], 'owners used correctly');
  }

  @test
  'owner can be used per-template in runtime resolver'(assert: Assert) {
    this.delegate.registerComponent('TemplateOnly', 'TemplateOnly', 'FooQux', 'testing');

    this.delegate.registerComponent(
      'Curly',
      'Curly',
      'FooBaz',
      null,
      class FooBaz extends EmberishCurlyComponent {
        layout = createTemplate('<FooQux/>')(() => {
          assert.step('foo-baz owner called');
        });
      }
    );

    this.delegate.registerComponent(
      'Curly',
      'Curly',
      'FooBar',
      null,
      class FooBar extends EmberishCurlyComponent {
        layout = createTemplate('<FooBaz/>')(() => {
          assert.step('foo-bar owner called');
        });
      }
    );

    this.render('<FooBar/>');

    assert.verifySteps(['foo-bar owner called', 'foo-baz owner called'], 'owners used correctly');
  }
}

suite(OwnerTest, OwnerJitRenderDelegate);
