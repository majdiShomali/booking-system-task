import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const createPost = api.post.create.useMutation({
    onSuccess: (newPost) => {
      console.log("Post created successfully:", newPost);
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });

  const handleCreatePost = () => {
    // Call the mutation with the post name input
    createPost.mutate({ name: "My New Post" });
  };
  const { toast } = useToast();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Button
        onClick={() => {
          toast({
            title: "Message Sent",
            description: "Thank you for your message",
            action: <ToastAction altText="undo">Undo</ToastAction>,
          });
        }}
      >
        Toast
      </Button>
    </div>
  );
}
