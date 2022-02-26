
namespace CleanArch.Domain.Model
{
    public class Category
    {
        public int Id { get; set; }
        public string Title { get; set; } = String.Empty;
        public int CategoryId { get; set; }
        public ICollection<Category>? Categories { get; set; }
    }
}
