using System;
using System.Collections.Generic;

namespace Model
{
    public class HoaDonModel
    {
        public string ma_hoa_don { get; set; }
        public string ho_ten { get; set; }
        public string dia_chi { get; set; }

        public string SDT { get; set; }

        public string Email { get; set; }
        public List<ChiTietHoaDonModel> listjson_chitiet { get; set; }
    }
}
