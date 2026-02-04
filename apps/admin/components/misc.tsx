import { Button } from "@coderina-ams/ui/components/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackLink = ({ href, text }: { href: string; text: string }) => {
  const router = useRouter();
  const handleBackClick = () => {
    router.push(href);
  };
  return (
    <Button
      onClick={handleBackClick}
      variant="link"
      className="px-0 text-sm font-medium"
    >
      <ArrowLeft />
      Back to all {text}
    </Button>
  );
};