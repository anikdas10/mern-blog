import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteAddCategory, RouteEditCategory } from "@/helpers/RouteName";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetch from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import Loading from "@/components/Loading";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { deleteData } from "@/helpers/handleDelete";
import { showToast } from "@/helpers/showToast";
const CategoryDetails = () => {
 const [refreshData,setRefreshData] = useState(false);
  const { data:categoryData,page,setPage,totalPages, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/category/all-category`,{},5,"data",[refreshData]
  );

  const handleDeleteData =async (id)=>{
    
      const result = await deleteData(`${getEnv("VITE_API_BASE_URL")}/category/delete/${id}`);

      if(result)
      {
        setRefreshData(!refreshData);
        showToast("success","Data deleted.")
      }
      else{
        showToast("error","Data not deleted.")
      }
  }
  

  if (loading) {
    return <Loading />
    }
  
  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Button className="bg-violet-500" asChild>
              <Link to={RouteAddCategory}>Add Category</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead className="text-center">Slug</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryData && categoryData.length > 0 ? (
                categoryData.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {category.slug}
                    </TableCell>
                    <TableCell className="flex items-center gap-2 justify-center">
                      <Button
                        variant="outline"
                        className="hover:bg-violet-500 hover:text-white"
                        asChild
                      >
                        <Link to={RouteEditCategory(category._id)}>
                          <FiEdit />
                        </Link>
                      </Button>
                      <Button
                        variant="outline" onClick={()=>handleDeleteData(category._id)}
                        className="hover:bg-violet-500 hover:text-white cursor-pointer"
                      >
                        <MdDeleteForever />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}> Data not Found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <div className="mt-4 flex  items-center gap-4 p-5">
          <Button className="bg-violet-500 hover:bg-violet-400 cursor-pointer"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>

          <span className="text-lg">
            {" "}
            Page {page} of {totalPages}{" "}
          </span>

          <Button className="bg-violet-500 hover:bg-violet-400 cursor-pointer"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CategoryDetails;
