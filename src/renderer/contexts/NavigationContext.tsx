import React, { createContext, FC, useContext } from 'react';
import { BehaviorSubject } from 'rxjs';
import { useObservable } from '../hooks/useObservable';
import { NavigationItem } from '../models/NavigationItem';

export class NavigationContext {

  public stack: BehaviorSubject<Array<NavigationItem>> = new BehaviorSubject([]);

  private history: Array<Array<NavigationItem>> = [];

  public goTo = (items: Array<NavigationItem>): void => {
    this.history.push(this.stack.getValue());
    this.stack.next([...items]);
  }

  public push = (items: Array<NavigationItem>): void => {
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

export function useNavigationContext(): [Array<NavigationItem>, NavigationContext] {
  const context = useContext(_context);
  const stack = useObservable(context.stack, []);

  return [stack, context];
}
