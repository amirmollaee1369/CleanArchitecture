using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Reflection;

namespace Framework.Core.Filtering
{
    public static class FilterHelper
    {
        public static void ProcessFilters<T>(GridFilter filter, ref IQueryable<T> queryable)
        {
            var whereClause = string.Empty;
            var filters = filter.Filters;
            var parameters = new List<object>();
            for (int i = 0; i < filters.Count; i++)
            {
                var f = filters[i];

                if (f.perdict != null)
                {
                    var perdict = (Expression<Func<T, bool>>)f.perdict;
                    queryable = queryable.Where(perdict);
                }
                else if (f.Filters == null || f.Filters.Count <= 0)
                {
                    if (i == 0)
                        whereClause += BuildWherePredicate<T>(f, i, parameters) + " ";
                    if (i != 0)
                        whereClause += ToLinqOperator(filter.Logic) + BuildWherePredicate<T>(f, i, parameters) + " ";
                    if (i == (filters.Count - 1))
                    {
                        TrimWherePredicate(ref whereClause);
                        queryable = queryable.Where(whereClause, parameters.ToArray());
                    }
                }
                else
                    ProcessFilters(f, ref queryable);
            }
        }

        public static string TrimWherePredicate(ref string whereClause)
        {
            switch (whereClause.Trim().Substring(0, 2).ToLower())
            {
                case "&&":
                    whereClause = whereClause.Trim().Remove(0, 2);
                    break;
                case "||":
                    whereClause = whereClause.Trim().Remove(0, 2);
                    break;
            }

            return whereClause;
        }

        public static string BuildWherePredicate<T>(GridFilter filter, int index, List<object> parameters)
        {
            var entityType = (typeof(T));
            PropertyInfo property;

            if (filter.Field.Contains("."))
                property = GetNestedProp<T>(filter.Field);
            else
                property = entityType.GetProperty(filter.Field);

            var parameterIndex = parameters.Count;

            switch (filter.Operator.ToLower())
            {
                case "eq":
                case "neq":
                case "gte":
                case "gt":
                case "lte":
                case "lt":
                    if (typeof(System.DateTime).IsAssignableFrom(property.PropertyType))
                    {
                        parameters.Add(System.DateTime.Parse(filter.Value).Date);
                        return string.Format("EntityFunctions.TruncateTime(" + filter.Field + ")" + ToLinqOperator(filter.Operator) + "@" + parameterIndex);
                    }
                    if (typeof(Int64).IsAssignableFrom(property.PropertyType) ||
                        typeof(int).IsAssignableFrom(property.PropertyType) ||
                        typeof(Int32).IsAssignableFrom(property.PropertyType))
                    {
                        parameters.Add(Int64.Parse(filter.Value));
                        return string.Format(filter.Field + ToLinqOperator(filter.Operator) + "@" + parameterIndex);
                    }
                    parameters.Add(filter.Value);
                    return string.Format(filter.Field + ToLinqOperator(filter.Operator) + "@" + parameterIndex);
                case "startswith":
                    parameters.Add(filter.Value);
                    return filter.Field + ".StartsWith(" + "@" + parameterIndex + ")";
                case "endswith":
                    parameters.Add(filter.Value);
                    return filter.Field + ".EndsWith(" + "@" + parameterIndex + ")";
                case "contains":
                    parameters.Add(filter.Value);
                    return filter.Field + ".Contains(" + "@" + parameterIndex + ")";
                default:
                    throw new ArgumentException("This operator is not yet supported for this Grid", filter.Operator);
            }
        }

        public static string ToLinqOperator(string @operator)
        {
            switch (@operator.ToLower())
            {
                case "eq":
                    return " == ";
                case "neq":
                    return " != ";
                case "gte":
                    return " >= ";
                case "gt":
                    return " > ";
                case "lte":
                    return " <= ";
                case "lt":
                    return " < ";
                case "or":
                    return " || ";
                case "and":
                    return " && ";
                default:
                    return null;
            }
        }

        public static PropertyInfo GetNestedProp<T>(String name)
        {
            PropertyInfo info = null;
            var type = (typeof(T));
            foreach (var prop in name.Split('.'))
            {
                info = type.GetProperty(prop);
                type = info.PropertyType;
            }
            return info;
        }

        public static GridRequest AddCustomSort(GridRequest request, List<GridSort> sortArrays)
        {
            foreach (var sort in sortArrays)
            {
                request.Sort.Add(sort);
            }


            return request;
        }
    }
}
