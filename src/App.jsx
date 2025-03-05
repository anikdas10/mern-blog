
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
// import { Button } from './components/ui/button'
import Layout from './Layout/Layout'
import { RouteAddBlog, RouteAddCategory, RouteBlog, RouteCategoryDetails, RouteEditBlog, RouteEditCategory, RouteIndex, RouteProfile, RouteSignIn, RouteSignUp } from './helpers/RouteName'
import Index from './pages/Index'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import AddCategory from './pages/categories/AddCategory'
import CategoryDetails from './pages/categories/CategoryDetails'
import EditCategory from './pages/categories/EditCategory'
import AddBlog from './pages/blogs/AddBlog'
import BlogDetails from './pages/blogs/BlogDetails'
import EditBlog from './pages/blogs/EditBlog'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
          <Route path={RouteProfile} element={<Profile />} />

          {/* category */}
          <Route path={RouteAddCategory} element={<AddCategory />} />
          <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
          <Route path={RouteEditCategory()} element={<EditCategory />} />

          {/* blog */}
          <Route path={RouteAddBlog} element={<AddBlog />} />
          <Route path={RouteBlog} element={<BlogDetails />} />
          <Route path={RouteEditBlog()} element={<EditBlog />} />
        </Route>
        <Route path={RouteSignIn} element={<SignIn />} />
        <Route path={RouteSignUp} element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
