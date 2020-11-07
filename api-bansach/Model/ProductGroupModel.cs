using System;
using System.Collections.Generic;

namespace Model
{
    public class ProductGroupModel
    {
        public string parent_item_group_id { get; set; }
        public string item_group_id { get; set; }
        public string item_group_name { get; set; }
        public string url { get; set; }
        public short? seq_num { get; set; }
        public List<ProductGroupModel> children { get; set; }
        public string type { get; set; }
    }
}
