import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '../../../lib/supabase';
import { Plus, X, Loader2 } from 'lucide-react';
import { RichTextEditor } from '../../../components/RichTextEditor';

interface AddLogFormProps {
    subsystemId: string;
    onLogAdded: () => void;
}

export const AddLogForm: React.FC<AddLogFormProps> = ({ subsystemId, onLogAdded }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState<{
        title: string;
        content: string;
        author: string;
        date: string;
        images: { src: string; caption?: string }[];
    }>({
        title: '',
        content: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        images: []
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const files = Array.from(e.target.files);
        const newImages = [...formData.images];

        try {
            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
                const filePath = `${subsystemId}/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('log-images')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('log-images')
                    .getPublicUrl(filePath);

                newImages.push({ src: data.publicUrl, caption: '' });
            }
            setFormData({ ...formData, images: newImages });
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate content is not empty (strip HTML tags to check)
        const textContent = formData.content.replace(/<[^>]*>/g, '').trim();
        if (!textContent) {
            alert('Please enter some content for the log entry.');
            setIsSubmitting(false);
            return;
        }

        try {
            const { error } = await supabase
                .from('project_logs')
                .insert([
                    {
                        subsystem_id: subsystemId,
                        title: formData.title,
                        content: formData.content,
                        author: formData.author,
                        date: formData.date,
                        images: formData.images
                    }
                ]);

            if (error) {
                console.error('Supabase error:', error);
                throw error;
            }

            setFormData({
                title: '',
                content: '',
                author: '',
                date: new Date().toISOString().split('T')[0],
                images: []
            });
            setIsOpen(false);
            onLogAdded();
        } catch (error: any) {
            console.error('Error adding log:', error);
            if (error.message?.includes('JWT') || error.message?.includes('auth')) {
                alert('Authentication error. Please log in again.');
            } else if (error.code === '42501') {
                alert('Permission denied. Please make sure you are logged in with the correct account.');
            } else {
                alert(`Failed to add log entry: ${error.message || 'Unknown error'}`);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const [session, setSession] = useState<boolean>(false);

    React.useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(!!session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(!!session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (!session) {
        return null;
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
            >
                <Plus className="w-4 h-4" />
                Add Log Entry
            </button>
        );
    }

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-surface rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-border">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-serif font-bold text-primary">New Log Entry</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-panel rounded-full transition-colors text-text-muted hover:text-text"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">Date</label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-3 py-2 bg-bg border border-border rounded focus:border-primary focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">Author</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Your Name"
                                    value={formData.author}
                                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                                    className="w-full px-3 py-2 bg-bg border border-border rounded focus:border-primary focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">Title</label>
                            <input
                                type="text"
                                required
                                placeholder="What did you work on?"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-3 py-2 bg-bg border border-border rounded focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">Details</label>
                            <RichTextEditor
                                value={formData.content}
                                onChange={(content) => setFormData({ ...formData, content })}
                                placeholder="Describe progress, findings, or blocking issues... (Markdown supported)"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">Images</label>
                            <label className="block w-full cursor-pointer">
                                <span className="sr-only">Choose images</span>
                                <div className="border border-border rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:bg-panel transition-colors">
                                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                                        <Plus className="w-6 h-6" />
                                    </div>
                                    <span className="text-sm font-medium text-text-muted">Click to Upload Images or GIFs</span>
                                    <span className="text-xs text-text-muted/50">JPG, PNG, GIF, WEBP</span>
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                    className="hidden"
                                />
                            </label>
                            {uploading && <p className="text-xs text-primary mt-2">Uploading images...</p>}

                            {formData.images.length > 0 && (
                                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                                    {formData.images.map((img, i) => (
                                        <div key={i} className="relative shrink-0">
                                            <img src={img.src} alt="Thumbnail" className="w-16 h-16 object-cover rounded border border-border" />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newImages = [...formData.images];
                                                    newImages.splice(i, 1);
                                                    setFormData({ ...formData, images: newImages });
                                                }}
                                                className="absolute -top-1 -right-1 bg-bg border border-border rounded-full w-4 h-4 flex items-center justify-center text-xs hover:text-red-500"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center mt-8">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="px-6 py-2.5 text-sm font-medium text-text-secondary hover:bg-panel rounded-full transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || uploading}
                                className="flex items-center gap-2 px-8 py-2.5 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform active:scale-95 duration-200"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    'Post Entry'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>,
        document.body
    );
};

interface EditLogFormProps {
    subsystemId: string;
    log: any;
    onSave: (updatedLog: any) => void;
    onCancel: () => void;
}

export const EditLogForm: React.FC<EditLogFormProps> = ({ subsystemId, log, onSave, onCancel }) => {
    // Helper to format date string (e.g. "January 1, 2023") back to YYYY-MM-DD
    const formatDateForInput = (dateStr: string) => {
        if (!dateStr) return new Date().toISOString().split('T')[0];
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return new Date().toISOString().split('T')[0];

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [formData, setFormData] = useState({
        title: log.title || '',
        content: log.content || '',
        author: log.author || '',
        date: formatDateForInput(log.date),
        images: log.images || []
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const files = Array.from(e.target.files);
        const newImages = [...formData.images];

        try {
            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
                const filePath = `${subsystemId}/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('log-images')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('log-images')
                    .getPublicUrl(filePath);

                newImages.push({ src: data.publicUrl, caption: '' });
            }
            setFormData({ ...formData, images: newImages });
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const updatedLog = {
            ...log,
            ...formData
        };

        onSave(updatedLog);
        setIsSubmitting(false);
    };

    return (
        <div className="card p-6 border-l-4 border-blue-500">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">Date</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-3 py-2 bg-panel border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">Author</label>
                        <input
                            type="text"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            className="w-full px-3 py-2 bg-panel border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Your name"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 bg-panel border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Log entry title"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">Content</label>
                    <RichTextEditor
                        value={formData.content}
                        onChange={(content) => setFormData({ ...formData, content })}
                        placeholder="Describe what happened... (Markdown supported)"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">Images</label>
                    <label className="block w-full cursor-pointer">
                        <span className="sr-only">Choose images</span>
                        <div className="border border-border rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:bg-panel transition-colors border-dashed bg-bg/50">
                            <div className="p-2 bg-primary/10 rounded-full text-primary">
                                <Plus className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-medium text-text-muted">Add more images/GIFs</span>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            disabled={uploading}
                            className="hidden"
                        />
                    </label>
                    {uploading && <p className="text-xs text-primary mt-2">Uploading...</p>}

                    {formData.images.length > 0 && (
                        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                            {formData.images.map((img: any, i: number) => (
                                <div key={i} className="relative shrink-0">
                                    <img src={img.src} alt="Thumbnail" className="w-16 h-16 object-cover rounded border border-border" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newImages = [...formData.images];
                                            newImages.splice(i, 1);
                                            setFormData({ ...formData, images: newImages });
                                        }}
                                        className="absolute -top-1 -right-1 bg-bg border border-border rounded-full w-4 h-4 flex items-center justify-center text-xs hover:text-red-500 shadow-sm"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex gap-2 justify-end">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 text-text-muted hover:text-text transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting || uploading}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form >
        </div >
    );
};
