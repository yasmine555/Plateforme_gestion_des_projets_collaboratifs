using Projet.BLL.Contract;
using Projet.DAL.Contracts;
using System.Linq.Expressions;

namespace Projet.BLL
{
    public class GenericBLL<T> : IGenericBLL<T> where T : class, new()
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<T> _repo;

        public GenericBLL(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _repo = (IRepository<T>)_unitOfWork.GetRepository<T>();
        }

        public T Add(T entity)
        {
            _repo.Add(entity);
            _unitOfWork.Commit(); // Assurez-vous que les changements sont sauvegardés
            return entity; // Retourner l'objet ajouté
        }

        public bool Delete(T entity)
        {
            _repo.Delete(entity);
            _unitOfWork.Commit(); // Sauvegarder les modifications
            return true; // Indiquer que la suppression a réussi
        }

        public T GetById(params object[] id)
        {
            return _repo.GetById(id);
        }

        public IEnumerable<T> GetMany(Expression<Func<T, bool>>? predicate = null, params Expression<Func<T, object>>[] includeProperties)
        {
            return _repo.GetMany(predicate, includeProperties);
        }

        public T Update(T entity)
        {
            _repo.Update(entity);
            _unitOfWork.Commit(); // Sauvegarder les modifications
            return entity; // Retourner l'objet mis à jour
        }

        public void Submit()
        {
            _unitOfWork.Commit();
        }
    }
}
