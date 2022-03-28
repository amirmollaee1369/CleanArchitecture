using System.Collections.Generic;

namespace Framework.Core.Filtering
{
    public class FilterResponse<T>
    {
        public List<T> data { get; set; }
        public long total { get; set; }
        public int MinItem { get; set; }
        public FilterResponse(List<T> data, long total, int minItem = 0)
        {
            this.data = data;
            this.total = total;
            this.MinItem = minItem;
        }
    }
}
