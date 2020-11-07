using DAL;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
    public partial class NguoiDungBusiness : ICustomerBusiness
    {
        private INguoiDungRepository _res;
        public NguoiDungBusiness(INguoiDungRepository res)
        {
            _res = res;
        }
        public bool Create(NguoiDung model)
        {
            return _res.Create(model);
        }
    }

}
