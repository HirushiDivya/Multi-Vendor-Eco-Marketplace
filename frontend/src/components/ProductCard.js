const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 bg-slate-200">
        <img src={product.image_url || 'https://via.placeholder.com/150'} alt={product.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">{product.category}</span>
        <h3 className="mt-2 text-lg font-bold text-slate-800">{product.title}</h3>
        <p className="text-slate-500 text-sm line-clamp-2 mt-1">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">Rs. {product.price}</span>
          <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;