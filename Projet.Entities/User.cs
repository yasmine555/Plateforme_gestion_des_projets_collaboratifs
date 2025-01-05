namespace Projet.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public List<string> Badges { get; set; } = new List<string>();

        // Ajout du rôle
        public UserRole Role { get; set; } = UserRole.MembreEquipe; // Par défaut, Membre d'équipe
    }

    public enum UserRole
    {
        ChefDeProjet,
        MembreEquipe
    }
}
