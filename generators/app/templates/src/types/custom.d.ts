declare module '*.json' {
  const value: any;
  export default value;
}


export type OperationType = 'add' | 'del' | 'modify' | 'view' | 'apply'|'createAndEdit';
