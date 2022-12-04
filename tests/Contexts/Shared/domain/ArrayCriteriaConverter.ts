import { AggregateRoot } from '../../../../src/Contexts/Shared/Domain/AggregateRoot';
import { Criteria } from '../../../../src/Contexts/Shared/Domain/criteria/Criteria';
import { Operator } from '../../../../src/Contexts/Shared/Domain/criteria/FilterOperator';

export class ArrayCriteriaConverter {
  static convert<T extends AggregateRoot>(array: T[], criteria: Criteria) {
    return array.filter((aggregate: any) => {
      if (criteria.filters.filters.length > 0) {
        var toReturn: boolean[] = [];

        criteria.filters.filters.forEach(filter => {
          let comparation = false;
          switch (filter.operator.value) {
            case Operator.CONTAINS: {
              comparation = String(aggregate[filter.field.value].value).includes(
                filter.value.value as any
              );
              break;
            }
            case Operator.EQUAL: {
              comparation = aggregate[filter.field.value].value == filter.value.value;
              break;
            }
            case Operator.NOT_EQUAL: {
              comparation = aggregate[filter.field.value].value != filter.value.value;
              break;
            }
            case Operator.GT: {
              comparation = aggregate[filter.field.value].value < filter.value.value;
              break;
            }
            case Operator.LT: {
              comparation = aggregate[filter.field.value].value > filter.value.value;
              break;
            }
          }

          toReturn.push(comparation);
        });

        if (toReturn.every(key => key === true)) return aggregate;
      } else {
        return aggregate;
      }
    });
  }
}
