import Sidebar from "./Sidebar";
import ProductList from "./ProductList";

const CategoryLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-0 h-screen overflow-y-auto border-r bg-white">
          <Sidebar />
        </div>
      </div>
      <div className="flex-1">
        <ProductList />
      </div>
    </div>
  );
};

export default CategoryLayout;
