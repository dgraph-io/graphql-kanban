import {
  DocumentNode,
  MutationHookOptions,
  MutationTuple,
  OperationVariables,
  TypedDocumentNode,
  useMutation,
} from "@apollo/client";

function useDelete<TData = any, TVariables = OperationVariables>(
  MUTATION: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options: MutationHookOptions<TData, TVariables> = {}
): MutationTuple<TData, TVariables> {
  options.update = (cache, results) => {
    const data: { [key: string]: any } = results?.data || {};
    for (const [, m] of Object.entries(data)) {
      for (const [, r] of Object.entries(m)) {
        if (Array.isArray(r)) {
          r.forEach((i) => {
            const id = cache.identify(i);
            cache.evict({ id });
          });
        }
      }
    }
    cache.gc();
  };
  return useMutation<TData, TVariables>(MUTATION, options);
}

export default useDelete;
