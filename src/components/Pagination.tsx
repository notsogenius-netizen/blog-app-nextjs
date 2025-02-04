import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  return (
    <div className="flex justify-center space-x-2 mt-4">
      {currentPage > 1 && (
        <Link
          href={`/?page=${currentPage - 1}`}
          className="px-4 py-2 border rounded"
        >
          Previous
        </Link>
      )}

      {[...Array(totalPages)].map((_, index) => (
        <Link
          key={index}
          href={`/?page=${index + 1}`}
          className={`px-4 py-2 border rounded ${
            currentPage === index + 1 ? "bg-blue-500 text-white" : ""
          }`}
        >
          {index + 1}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`/?page=${currentPage + 1}`}
          className="px-4 py-2 border rounded"
        >
          Next
        </Link>
      )}
    </div>
  );
}
