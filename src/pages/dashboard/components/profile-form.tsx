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
import type { CreatePioneerFormValues } from "@/schemas/pioneer.schema";
import { createPioneerInitialData, createPioneerSchema, updatePioneerSchema } from "@/schemas/pioneer.schema";
import type { UpdatePioneerFormValues } from "@/schemas/pioneer.schema";
import  {type ExtractZODErrors, getZodErrors } from "@/schemas";
import { useToast } from "@/hooks/use-toast";
import { ShieldClose } from "lucide-react";
import SubmitButton from "@/components/ui/submit-button";
import { api } from "@/utils/api";
import type { Pioneer } from "@prisma/client";
import MultiSelect from "@/components/ui/multi-select";
import MultiTextInput from "@/components/ui/multi-text-input";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileFormProps {
  initialData: Pioneer | null;
  mode: "update" | "create";
  isLoading:boolean
}

export default function ProfileForm({initialData,mode,isLoading}:ProfileFormProps) {
  const createPioneerAction = api.pioneer.create.useMutation();
  const updatePioneerAction = api.pioneer.update.useMutation();

  const [formData, setFormData] = useState<CreatePioneerFormValues | UpdatePioneerFormValues >(
    initialData ?? createPioneerInitialData,
  );

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] =
    useState<ExtractZODErrors<CreatePioneerFormValues> | null>(null);

  const { toast } = useToast();
  const Router = useRouter();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));
  };
  

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, available: checked }));
  };

  const handleSkillsChange = (selectedSkills: string[]) => {
    setFormData((prev) => ({ ...prev, skills: selectedSkills }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  
    setLoading(true);

    try {
      if (mode === 'update') {
        const result = updatePioneerSchema.safeParse(formData);
        if (!result.success) {
          setErrors(getZodErrors(updatePioneerSchema, formData));
          return;
        }
        await updatePioneerAction.mutateAsync(result.data);
        toast({
          title: "Profile updated successfully",
          description: `Profile has been updated`,
        });
      } else {
        const result = createPioneerSchema.safeParse(formData);
        if (!result.success) {
          setErrors(getZodErrors(createPioneerSchema, formData));
          return;
        }
        const pioneer = await createPioneerAction.mutateAsync(result.data);
        setFormData({ ...pioneer });
        toast({
          title: "Profile created successfully",
          description: `Profile has been created`,
        });
        Router.push('/dashboard')
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

  if(isLoading) return <LoadingSkeleton/>
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{"معلومات الشخصية"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col items-start justify-start gap-5 lg:flex-row">
          <section className="flex h-full w-full flex-col items-start gap-5 lg:w-1/2">
            <div className="w-full space-y-2">
              <Label htmlFor="title">{"نبذة "}</Label>
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
            <div className="flex items-center justify-center w-full gap-2">
            <div className="w-full space-y-2">
              <Label htmlFor="experience">{"الخبرة"}</Label>
              <Input
                id="experience"
                name="experience"
                type="number"
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
              <Label htmlFor="session_duration">{"مدة الجلسة"}</Label>
              <Input
                id="session_duration"
                name="session_duration"
                type="number"
                value={formData.session_duration}
                onChange={handleInputChange}
              />
              {errors?.experience && (
                <p className="flex items-center text-sm text-red-500">
                  <ShieldClose size={15} className="mr-1" />
                  {errors.experience}
                </p>
              )}
            </div>
            </div>
          
            <div className="w-full space-y-2">
              <Label htmlFor="bio">{"  نبذة تعريفية " }</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="min-h-40 max-h-60"
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
                selected={formData.skills ?? []}
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
                  value={formData.facebook ?? ""}
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
                  value={formData.instagram ?? ""}
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
                  value={formData.twitter ?? ""}
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
            <MultiTextInput
              initialData={
                formData.additional_information?.map((value, id) => {
                  return { id, value };
                }) ?? []
              }
              title="معلومات اضافية"
              onChange={(data) => {
                setFormData((prev) => {
                  return { ...prev, additional_information: data };
                });
              }}
            />
          </section>
        </CardContent>
        <CardFooter>
          <SubmitButton
            loadingTitle={mode ==='update' ? "...تحديث" : "...انشاء"}
            loading={loading}
          >
            {mode ==='update' ? "تحديث" : "انشاء"}
          </SubmitButton>
        </CardFooter>
      </form>
    </Card>
  );
}


function LoadingSkeleton() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-8 w-48" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-start justify-start gap-5 lg:flex-row">
        <section className="flex h-full w-full flex-col items-start gap-5 lg:w-1/2">
          <div className="w-full space-y-2">
            <Label>
              <Skeleton className="h-4 w-20" />
            </Label>
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex items-center justify-center w-full gap-2">
            <div className="w-full space-y-2">
              <Label>
                <Skeleton className="h-4 w-20" />
              </Label>
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="w-full space-y-2">
              <Label>
                <Skeleton className="h-4 w-20" />
              </Label>
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="w-full space-y-2">
            <Label>
              <Skeleton className="h-4 w-32" />
            </Label>
            <Skeleton className="h-40 w-full" />
          </div>
          <div className="mt-2 flex w-full items-center gap-2 space-x-2">
            <Skeleton className="h-5 w-5" />
            <Label>
              <Skeleton className="h-4 w-16" />
            </Label>
          </div>
        </section>
        <section className="flex h-full w-full flex-col items-start justify-start gap-5 lg:w-1/2">
          <div className="w-full space-y-2">
            <Label>
              <Skeleton className="h-4 w-24" />
            </Label>
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="w-full space-y-4">
            <div className="space-y-2">
              <Label>
                <Skeleton className="h-4 w-32" />
              </Label>
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Label>
                <Skeleton className="h-4 w-32" />
              </Label>
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="w-full space-y-4">
            <div className="space-y-2">
              <Label>
                <Skeleton className="h-4 w-32" />
              </Label>
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="w-full space-y-2">
            <Label>
              <Skeleton className="h-4 w-36" />
            </Label>
            <Skeleton className="h-20 w-full" />
          </div>
        </section>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-24" />
      </CardFooter>
    </Card>
  )
}