import React, { createContext, FC, useContext } from 'react';
import { BehaviorSubject } from 'rxjs';
import { useObservable } from '../hooks/useObservable';

export interface NavigationItem<T> {
  label: string;
  viewData?: T;
}

export class NavigationContext {

  public stack: BehaviorSubject<Array<NavigationItem<unknown>>> = new BehaviorSubject([]);

  private history: Array<Array<NavigationItem<unknown>>> = [];

  public goTo = (items: Array<NavigationItem<unknown>>): void => {
    this.history.push(this.stack.getValue());
    this.stack.next([...items]);
  }

  public push = (items: Array<NavigationItem<unknown>>): void => {
    this.history.push(this.stack.getValue());
    this.stack.next([...this.stack.getValue(), ...items]);
  }

  public canGoBack = (): boolean => {
    return this.history.length > 0;
  }

  public back = (): void => {
    if (this.history.length ===  0) return;

    const prevState = this.history.pop();
    this.stack.next(prevState);
  }
}

const _context = createContext<NavigationContext>(new NavigationContext());

export const NavigationProvider: FC = ({ children }) => <_context.Provider value={new NavigationContext()}>{children}</_context.Provider>;

export function useNavigationContext(): [Array<NavigationItem<unknown>>, NavigationContext] {
  const context = useContext(_context);
  const stack = useObservable(context.stack, []);

  return [stack, context];
}
