using DAL.Helper;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DAL
{
    public partial class ProductRepository : IProductRepository
    {
        private IDatabaseHelper _dbHelper;
        public ProductRepository(IDatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        public bool Create(ProductModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_item_create",
                "@item_id", model.item_id,
                "@item_group_id", model.item_group_id,
                "@item_image", model.item_image,
                "@item_name", model.item_name,
                "@item_price", model.item_price,
                "@item_mota", model.item_mota
                );
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Update(ProductModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_item_update",
                "@item_id", model.item_id,
                "@item_group_id", model.item_group_id,
                "@item_image", model.item_image,
                "@item_name", model.item_name,
                "@item_price", model.item_price,
                "@item_mota", model.item_mota);
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Delete(ProductModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbHelper.ExecuteScalarSProcedureWithTransaction(out msgError, "sp_item_delete",
                "@item_id", model.item_id);
                if ((result != null && !string.IsNullOrEmpty(result.ToString())) || !string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public ProductModel GetDatabyID(string id)
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_item_get_by_id",
                     "@item_id", id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ProductModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ProductModel> GetDataAll()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_item_all");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ProductModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ProductModel> GetDatakhuyenmai()
        {
            string msgError = "";
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "san_pham_khuyen_mai");
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<ProductModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<ProductModel> Search(int pageIndex, int pageSize, out long total, string item_group_id)
        {
            string msgError = "";
            total = 0;
            try
            {
                var dt = _dbHelper.ExecuteSProcedureReturnDataTable(out msgError, "sp_item_search",
                    "@page_index", pageIndex,
                    "@page_size", pageSize,
                    "@item_group_id", item_group_id);
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                if (dt.Rows.Count > 0) total = (long)dt.Rows[0]["RecordCount"];
                return dt.ConvertTo<ProductModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
