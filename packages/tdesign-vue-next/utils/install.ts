import { App, Plugin, Component, Directive } from 'vue';

declare type SFCWithInstall<T> = T & Plugin & component

declare type component = {
  name: string
}

export function withInstall<T>(
  comp: T,
  alias?: string,
  directive?: { name: string; comp: Directive<T & Plugin> },
): T & Plugin {
  const componentPlugin = comp as T & Component & Plugin;

  componentPlugin.install = (app: App, name?: string) => {
    // @ts-ignore
    app.component(alias || name || componentPlugin.name, comp);
    directive && app.directive(directive.name, directive.comp);
  };

  return componentPlugin as T & Plugin;
}