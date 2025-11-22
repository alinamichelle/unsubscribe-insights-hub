import { useState } from "react";
import { X, Users, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const referralSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(20, "Phone number must be less than 20 characters"),
  needs: z.string().trim().min(1, "Please describe their needs").max(200, "Needs must be less than 200 characters"),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional(),
});

type ReferralFormData = z.infer<typeof referralSchema>;

interface ReferralDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReferralDrawer({ isOpen, onClose }: ReferralDrawerProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ReferralFormData>({
    name: "",
    email: "",
    phone: "",
    needs: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ReferralFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof ReferralFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form
    const result = referralSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ReferralFormData, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof ReferralFormData;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Submit to backend/Supabase
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock API call

      toast({
        title: "Referral Submitted!",
        description: `Thank you for referring ${formData.name}. You've earned 500 points and a raffle ticket!`,
      });

      // Reset form and close drawer
      setFormData({
        name: "",
        email: "",
        phone: "",
        needs: "",
        message: "",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/30 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full lg:w-[480px] bg-white shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200/60 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Refer Someone</h2>
              <p className="text-xs text-slate-500">Earn 500 points + raffle ticket</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Reward Banner */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎁</span>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-slate-900">Referral Rewards</h3>
                <p className="text-xs text-slate-600">
                  500 points now, 1,000 bonus if they close!
                </p>
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="John Smith"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={errors.name ? "border-rose-400" : ""}
            />
            {errors.name && (
              <p className="text-xs text-rose-600">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={errors.email ? "border-rose-400" : ""}
            />
            {errors.email && (
              <p className="text-xs text-rose-600">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={errors.phone ? "border-rose-400" : ""}
            />
            {errors.phone && (
              <p className="text-xs text-rose-600">{errors.phone}</p>
            )}
          </div>

          {/* Needs */}
          <div className="space-y-2">
            <Label htmlFor="needs">What are they looking for? *</Label>
            <Input
              id="needs"
              placeholder="e.g., Buying their first home in South Austin"
              value={formData.needs}
              onChange={(e) => handleChange("needs", e.target.value)}
              className={errors.needs ? "border-rose-400" : ""}
            />
            {errors.needs && (
              <p className="text-xs text-rose-600">{errors.needs}</p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Additional Information (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Any other details that would be helpful..."
              rows={4}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className={`resize-none ${errors.message ? "border-rose-400" : ""}`}
            />
            {errors.message && (
              <p className="text-xs text-rose-600">{errors.message}</p>
            )}
            <p className="text-xs text-slate-500">
              {formData.message?.length || 0}/1000 characters
            </p>
          </div>

          {/* Privacy Note */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4">
            <p className="text-xs text-slate-600">
              By submitting this referral, you confirm you have permission to share this person's contact information. 
              We'll reach out within 24 hours.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 rounded-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Submitting...</>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Referral
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
