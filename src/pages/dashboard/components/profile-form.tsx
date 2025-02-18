"use client";
import type React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MultiSelect } from "./multi-select";
import { PioneerFormValues, pioneerSchema } from "@/schemas/pioneer.schema";
import { ExtractZODErrors, getZodErrors } from "@/schemas";
import { useToast } from "@/hooks/use-toast";
import { ShieldClose } from "lucide-react";
import SubmitButton from "@/components/ui/submit-button";
import { api } from "@/utils/api";
import { Pioneer } from "@prisma/client";
interface ProfileFormProps {
  initialData: Pioneer | null;
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const [formData, setFormData] = useState<PioneerFormValues>(
    initialData || {
      id:"",
      title: "",
      experience: "",
      bio: "",
      available: false,
      skills: [],
      facebook: "",
      instagram: "",
      twitter: "",
    },
  );
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] =
    useState<ExtractZODErrors<PioneerFormValues> | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, available: checked }));
  };

  const handleSkillsChange = (selectedSkills: string[]) => {
    setFormData((prev) => ({ ...prev, skills: selectedSkills }));
  };
  const createPioneerAction = api.pioneer.create.useMutation();
  const updatePioneerAction = api.pioneer.update.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = pioneerSchema.safeParse(formData);
    if (!result.success) {
      setErrors(getZodErrors(pioneerSchema, formData));
      return;
    }
    setLoading(true);

    try {
        if (formData?.id) {
          await updatePioneerAction.mutateAsync(formData);
          toast({
            title: "Profile updated successfully",
            description: `Profile has been updated`,
          });
        } else {
            const pioneer =  await createPioneerAction.mutateAsync(formData);
            setFormData({...pioneer})
          toast({
            title: "Profile created successfully",
            description: `Profile has been created`,
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: `An error occurred, please try again`,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>{"معلومات الشخصية"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col items-start justify-start gap-5 lg:flex-row">
          <section className="flex h-full w-full flex-col items-start gap-5 lg:w-1/2">
            <div className="w-full space-y-2">
              <Label htmlFor="title">{"نبذة تعريفية"}</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
              {errors?.title && (
                <p className="flex items-center text-sm text-red-500">
                  <ShieldClose size={15} className="mr-1" />
                  {errors.title}
                </p>
              )}
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="experience">{"الخبرة"}</Label>
              <Input
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
              />
              {errors?.experience && (
                <p className="flex items-center text-sm text-red-500">
                  <ShieldClose size={15} className="mr-1" />
                  {errors.experience}
                </p>
              )}
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="bio">{"نبذة"}</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="max-h-60"
              />
              {errors?.bio && (
                <p className="flex items-center text-sm text-red-500">
                  <ShieldClose size={15} className="mr-1" />
                  {errors.bio}
                </p>
              )}
            </div>
            <div className="mt-2 flex w-full items-center gap-2 space-x-2">
              <Checkbox
                id="available"
                checked={formData.available}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="available">{"متاح"}</Label>
            </div>
          </section>
          <section className="flex h-full w-full flex-col items-start justify-start gap-5 lg:w-1/2">
            <div className="w-full space-y-2">
              <Label>{"المهارات"}</Label>
              <MultiSelect
                options={[
                  "e-com اشتراك",
                  "اعتماد الوسائط الرقمية / المنصة",
                  "بناء و تطوير كود5",
                  "الاستثمار المبكر",
                  "استراتيجيات نمو تويتر",
                  "بناء المجتمع",
                ]}
                selected={formData.skills}
                onChange={handleSkillsChange}
              />
              {errors?.skills && (
                <p className="flex items-center text-sm text-red-500">
                  <ShieldClose size={15} className="mr-1" />
                  {errors.skills}
                </p>
              )}
            </div>
            <div className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook">حساب Facebook </Label>
                <Input
                  id="facebook"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                  placeholder="https://facebook.com/username"
                />
                {errors?.facebook && (
                  <p className="flex items-center text-sm text-red-500">
                    <ShieldClose size={15} className="mr-1" />
                    {errors.facebook}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">حساب Instagram </Label>
                <Input
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/username"
                />
                {errors?.instagram && (
                  <p className="flex items-center text-sm text-red-500">
                    <ShieldClose size={15} className="mr-1" />
                    {errors.instagram}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="twitter">حساب twitter </Label>
                <Input
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/username"
                />
                {errors?.twitter && (
                  <p className="flex items-center text-sm text-red-500">
                    <ShieldClose size={15} className="mr-1" />
                    {errors.twitter}
                  </p>
                )}
              </div>
            </div>
          </section>
        </CardContent>
        <CardFooter>
          <SubmitButton
            loadingTitle={formData.id ? "...تحديث" : "...انشاء"}
            loading={loading}
          >
            {formData.id ? "تحديث" : "انشاء"}
          </SubmitButton>
        </CardFooter>
      </form>
    </Card>
  );
}
