import { redirect } from "next/navigation";

const AdminPage = async () => {
  redirect("/auth/sign-in");
};

export default AdminPage;
