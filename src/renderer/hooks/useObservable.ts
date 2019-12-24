import { Observable } from 'rxjs';
import { useEffect, useState } from 'react';

export function useObservable<T>(observable: Observable<T>, initialState: T): T {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const sub = observable.subscribe((data) => {
      console.log(data); 
      setState(data)
    });
    return sub.unsubscribe;
  }, [observable]);

  return state;
}
