import * as React from 'react';
import { DocumentNode } from 'graphql';
import { parser, DocumentType } from './parser';
import { OperationOption, DataProps, MutateProps, ChildProps } from './types';

import { query } from './query-hoc';
import { mutation } from './mutation-hoc';
import { subscribe } from './subscription-hoc';

export function graphql<
  TProps extends TGraphQLVariables | {} = {},
  TData = {},
  TGraphQLVariables = {},
  TChildProps = ChildProps<TProps,TData, TGraphQLVariables>
>(
  document: DocumentNode,
  operationOptions: OperationOption<TProps, TData, TGraphQLVariables, TChildProps> = {},
) {
  switch (parser(document).type) {
    case DocumentType.Mutation:
      return mutation(document, operationOptions);
    case DocumentType.Subscription:
      return subscribe(document, operationOptions);
    // case DocumentType.Fragment:
    //   throw new Error('fragments cannont currently be used on their own');
    case DocumentType.Query:
    default:
      return query(document, operationOptions);
  }
}
