import { Injectable, PipeTransform } from '@nestjs/common';
import { QueryParamsDto } from 'src/common/query-params.dto';

@Injectable()
export class QueryParamsPipe implements PipeTransform {
  transform(params: QueryParamsDto) {
    if (!params) return null;
    const filters = params.filters || null;
    let sortParamsArray;
    if (params.sort) {
      const sortTuples = params.sort.split(',');
      sortParamsArray = sortTuples.map((val) => val.split(':'));
    }
    const limit = params.limit ?? 10;
    const offset = params.offset ?? 0;
    return {
      filters,
      sortParamsArray,
      limit,
      offset,
    };
  }
}
