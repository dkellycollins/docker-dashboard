import React, { createContext, FC, useContext } from 'react';
import { BehaviorSubject } from 'rxjs';

export interface NavigationContext {
  stack: BehaviorSubject<Array<NavigationItem<unknown>>>;
}

export interface NavigationItem<T> {
  label: string;
  viewData: T;
}

export interface NavigationApi {
  goTo(items: Array<NavigationItem<unknown>>): void;
  push<T>(item: NavigationItem<T>): void;
  back(): void;
}

const _context = createContext<NavigationContext>({ stack: new BehaviorSubject([]) });

export const NavigationProvider: FC = ({ children }) => <_context.Provider value={{ stack: new BehaviorSubject([]) }}>{children}</_context.Provider>;

export function useNavigationContext(): [NavigationContext, NavigationApi] {
  const context = useContext(_context);

  function goTo(items: Array<NavigationItem<unknown>>) { console.log(items); context.stack.next([...items]); };
  function push<T>(item: NavigationItem<T>) { context.stack.next([...context.stack.getValue(), item]); };
  function back() { 
    const stack = context.stack.getValue();
    stack.pop();
    context.stack.next(stack); 
  }

  return [context, { goTo, push, back }];
}
