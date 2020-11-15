using DAL;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL
{
    public partial class ProductGroupBusiness : IItemGroupBusiness
    {
        private IProductGroupRepository _res;
        public ProductGroupBusiness(IProductGroupRepository ItemGroupRes)
        {
            _res = ItemGroupRes;
        }
        
        public List<ProductGroupModel> GetData()
        {
            var allItemGroups = _res.GetData();
            var lstParent = allItemGroups.OrderBy(s => s.seq_num).ToList();
            foreach (var item in lstParent)
            {
                item.children = GetHiearchyList(allItemGroups, item);
            }
            return lstParent;
        }
        public List<ProductGroupModel> GetHiearchyList(List<ProductGroupModel> lstAll, ProductGroupModel node)
        {
            var lstChilds = lstAll.Where(ds => ds.parent_item_group_id == node.item_group_id).ToList();
            if (lstChilds.Count == 0)
                return null;
            for (int i = 0; i < lstChilds.Count; i++)
            {
                var childs = GetHiearchyList(lstAll, lstChilds[i]);
                lstChilds[i].type = (childs == null || childs.Count == 0) ? "leaf" : "";
                lstChilds[i].children = childs;
            }
            return lstChilds.OrderBy(s => s.seq_num).ToList();
        }
        public bool Create(ProductGroupModel model)
        {
            return _res.Create(model);
        }

        public bool Update(ProductGroupModel model)
        {
            return _res.Update(model);
        }

        public bool Delete(ProductGroupModel model)
        {
            return _res.Delete(model);
        }

        public ProductGroupModel GetDatabyID(string id)
        {
            return _res.GetDatabyID(id);
        }
       
    }

}
