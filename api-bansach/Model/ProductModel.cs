using System;
using System.Collections.Generic;

namespace Model
{
    public class ProductModel
    {
        public string item_id { get; set; }
        public string item_group_id { get; set; }
        public string item_name { get; set; }
        public string item_image { get; set; }
        public decimal? item_price { get; set; }
        public string item_mota { get; set; }
    }
}
