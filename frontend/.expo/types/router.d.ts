/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/auth/login`; params?: Router.UnknownInputParams; } | { pathname: `/auth/register`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/home`; params?: Router.UnknownInputParams; } | { pathname: `/restaurant/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/auth/login`; params?: Router.UnknownOutputParams; } | { pathname: `/auth/register`; params?: Router.UnknownOutputParams; } | { pathname: `/tabs/home`; params?: Router.UnknownOutputParams; } | { pathname: `/restaurant/[id]`, params: Router.UnknownOutputParams & { id: string; } };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/auth/login${`?${string}` | `#${string}` | ''}` | `/auth/register${`?${string}` | `#${string}` | ''}` | `/tabs/home${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/auth/login`; params?: Router.UnknownInputParams; } | { pathname: `/auth/register`; params?: Router.UnknownInputParams; } | { pathname: `/tabs/home`; params?: Router.UnknownInputParams; } | `/restaurant/${Router.SingleRoutePart<T>}${`?${string}` | `#${string}` | ''}` | { pathname: `/restaurant/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
    }
  }
}
