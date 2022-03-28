using System.Collections.Generic;

namespace Framework.Core.Filtering
{
    public class GridRequest
    {
        public int Take { get; set; }
        public int Skip { get; set; }
        public string Filter { get; set; }
        public GridFilter FilterX { get; set; }
        public List<GridSort> Sort { get; set; }
    }
}
