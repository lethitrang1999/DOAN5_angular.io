using DAL;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
    public partial class ProductBusiness : IItemBusiness
    {
        private IProductRepository _res;
        public ProductBusiness(IProductRepository ItemGroupRes)
        {
            _res = ItemGroupRes;
        }
        public bool Create(ProductModel model)
        {
            return _res.Create(model);
        }

        public bool Update(ProductModel model)
        {
            return _res.Update(model);
        }

        public bool Delete(ProductModel model)
        {
            return _res.Delete(model);
        }

        public ProductModel GetDatabyID(string id)
        {
            return _res.GetDatabyID(id);
        }
        public List<ProductModel> GetDataAll()
        {
            return _res.GetDataAll();
        }
        public List<ProductModel> GetDatakhuyenmai()
        {
            return _res.GetDatakhuyenmai();
        }
        public List<ProductModel> Search(int pageIndex, int pageSize, out long total, string item_group_id)
        {
            return _res.Search(pageIndex, pageSize, out total, item_group_id);
        }
    }

}
