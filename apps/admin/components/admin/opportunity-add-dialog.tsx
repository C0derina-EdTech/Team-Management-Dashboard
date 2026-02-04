"use client";

import {  useState } from "react";
import { toast } from "sonner"
import { Label } from "@nemma/ui/components/label";
import { Input } from "@nemma/ui/components/input";
import { ConfirmationDialog } from "@/components/confirmation-dialog";

import { useOpportunityStore } from "@/hooks/opportunity";
import { Textarea } from "@nemma/ui/components/textarea";


interface OpportunitySourceAddDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function OpportunityAddDialog({
  isOpen,
  onClose,
  onSuccess,
}: OpportunitySourceAddDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string
    description: string
    tags: string[]
    requirements: string[]
    application_link: string
    deadline: string
  }>({
    name: "",
    description: "",
    tags: [],
    requirements: [],
    application_link: "",
    deadline: ""
    // type: "link" as "rss_feed" | "link" | "blog",
  });
  const { createItem: createOpportunity } = useOpportunityStore()

  const handleCreateOpportunity = async () => {
    try {
      setIsLoading(true);
      console.log(formData)
      await createOpportunity(formData);
      toast.success("Opportunity created successfully");
      onSuccess?.();
      onClose();
      // Reset form
      setFormData({
        name: "",
        description: "",
        tags: [],
        requirements: [],
        application_link: "",
        deadline: ""
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConfirmationDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleCreateOpportunity}
      title="Add New Opportunity Source"
      description="Create a new opportunity source with the following details."
      confirmText={isLoading ? "Creating..." : "Create Source"}
    >
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Enter opportunity name"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="application_link">Link</Label>
          <Input
            id="application_link"
            type="text"
            value={formData.application_link}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, application_link: e.target.value }))
            }
            placeholder="Enter application link"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="deadline">Deadline</Label>
          <Input
            id="deadline"
            type="date"
            value={formData.deadline}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, deadline: e.target.value }))
            }
            placeholder="Enter application link"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Enter Description"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="requirements">Requirements</Label>
          <Textarea
            id="requirements"
            value={formData.requirements.join(", ")}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, requirements: e.target.value.split(",").map((item) => item.trim()) }))
            }
            placeholder="Enter Requirements with each requirement on a new line or separate with commas"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="tags">Tags</Label>
          <Textarea
            id="tags"
            value={formData.tags.join(", ")}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, tags: e.target.value.split(",").map((item) => item.trim()) }))
            }
            placeholder="Enter tags with each tag on a new line or separate with commas"
            required
          />
        </div>
      </div>
    </ConfirmationDialog>
  );
}
