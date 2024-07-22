import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const ContactModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    bandName: '',
    suggestion: '',
    sources: '',
  });

  useEffect(() => {
    const handleOpenDialog = () => setIsOpen(true);
    window.addEventListener('openContactDialog', handleOpenDialog);
    return () => window.removeEventListener('openContactDialog', handleOpenDialog);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          access_key: import.meta.env.CONTACT_FORM_API_KEY,
        })
      });

      const result = await response.json();
      if (response.status === 200) {
        alert(result.message);
        setFormData({ bandName: '', suggestion: '', sources: '' }); 
        setIsOpen(false);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };

  return (
    
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-zinc-900 border-black sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className=' font-bold '>Suggestions</DialogTitle>
          <DialogDescription className="pt-3">
            Use this form to send us suggestions about new bands to be added, sources for the existing ones or other information. 
            Please, add sources to your information so we can verify them (links, videos, etc).
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bandName" className="text-right">
                Band name
              </Label>
              <Input
                id="bandName"
                name="bandName"
                value={formData.bandName}
                onChange={handleInputChange}
                placeholder="Band Name"
                className="col-span-3 border-black text-zinc-950"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Suggestion
              </Label>
              <Textarea
                id="suggestion"
                name="suggestion"
                value={formData.suggestion}
                onChange={handleInputChange}
                placeholder="Write your suggestion here"
                className="col-span-3 border-black text-zinc-950"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bandName" className="text-right">
                Sources
              </Label>
              <Textarea
                id="sources"
                name="sources"
                value={formData.sources}
                onChange={handleInputChange}
                placeholder="Add sources for your suggestion"
                className="col-span-3 border-black text-zinc-950"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Send</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;