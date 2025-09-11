"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteMe } from "@/lib/actions/delete-me.action";
import { FiAlertTriangle } from "react-icons/fi";
import { signOut } from "next-auth/react";
import { editProfile } from "@/lib/actions/edit-profile.action";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function AccountSettingsButtons() {
  const [showModal, setShowModal] = useState(false);
  const { data: session, update } = useSession();

  const handleDelete = async () => {
    try {
      await deleteMe(false); // delete from backend

      setShowModal(false);
    } catch (err) {
      console.error("Error deleting account:", err);
      throw err; // rethrow so logout won't run if delete fails
    }
  };

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/login" });
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const handleSaveChanges = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const form = (e.currentTarget as HTMLButtonElement).closest("form");
    if (!form) return;

    const formData = new FormData(form);

    const values = Object.fromEntries(
      Array.from(formData.entries()).filter(([_, value]) => {
        return value !== null && value.toString().trim() !== "";
      })
    );

    try {
      await editProfile(values);
      toast.success("Profile updated successfully! Please log in again.");
      await signOut({ callbackUrl: "/login" }); // force logout → login screen
    } catch (err) {
      console.error("Error saving profile:", err);
      toast.error("Failed to update profile.");
    }
  };

  const handleConfirmDelete = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e?.preventDefault(); // stops form submission refresh

    await handleDelete();
    await handleLogout();
  };
  return (
    <div className="flex gap-4">
      <Button
        type="button"
        onClick={() => setShowModal(true)}
        className="w-full px-2 rounded-none font-geistMono mt-4 bg-red-50 text-red-600 hover:bg-red-100"
      >
        Delete my account
      </Button>

      <Button
        onClick={handleSaveChanges}
        type="submit"
        className="w-full px-2 rounded-none font-geistMono mt-4 bg-blue-600 text-white hover:bg-blue-700"
      >
        Save Changes
      </Button>

      {/* Modal */}
      {showModal && (
        <div className="fixed font-geistMono inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white flex flex-col pt-12 w-[900px] items-center justify-center   shadow-lg text-center">
            <div className="relative flex items-center justify-center my-16">
              {/* background warning circles */}
              <div className="absolute w-20 h-20 rounded-full bg-red-200 animate-ping" />
              <div className="absolute w-16 h-16 rounded-full bg-red-200 animate-ping delay-100" />
              <div className="absolute w-32 h-32 rounded-full bg-red-100 animate-pulse" />

              {/* icon on top */}
              <FiAlertTriangle
                size={40}
                className="relative text-red-500 z-10"
              />
            </div>
            <h4 className="mb-4 text-xl text-red-500">
              Are you sure you want to delete your account?
            </h4>
            <p>
              This action cannot be undone. All your data will be permanently
              deleted.
            </p>

            <div className="flex justify-center  gap-8 mt-8 py-8  bg-gray-100 w-full ">
              <Button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 rounded-none text-black  px-6  hover:bg-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDelete}
                className="bg-red-600 hover:bg-red-700 rounded-none  px-6  text-white"
              >
                Yes, delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
