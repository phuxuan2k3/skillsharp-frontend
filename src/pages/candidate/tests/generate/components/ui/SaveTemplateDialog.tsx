import React from 'react';
import { XCircle, Save, Plus, X } from 'lucide-react';
import { usePostTemplatesMutation } from '../../../templates/apis/template.api-enhance';
import { PracticeDifficulty, TemplateCreateData } from '../../types';
import { parseQueryError } from '../../../../../../helpers/fetchBaseQuery.error';

interface SaveTemplateDialogProps {
	isOpen: boolean;
	onClose: () => void;
	initializeTemplateCreateData: Omit<TemplateCreateData, "name">;
	onTemplateSaved: (data: TemplateCreateData) => void;
}

const SaveTemplateDialog: React.FC<SaveTemplateDialogProps> = ({
	isOpen,
	onClose,
	initializeTemplateCreateData,
	onTemplateSaved,
}) => {
	const [templateCreateData, setTemplateCreateData] = React.useState<TemplateCreateData>({
		...initializeTemplateCreateData,
		name: '',
	});

	const [error, setError] = React.useState<string | null>(null);
	const [isSaving, setIsSaving] = React.useState(false);
	const [createTemplate] = usePostTemplatesMutation();

	const [newTag, setNewTag] = React.useState<string>('');
	const [newOutline, setNewOutline] = React.useState<string>('');

	const handleSaveTemplateConfirm = async () => {
		try {
			setIsSaving(true);
			if (!templateCreateData.name.trim()) {
				setError("Template name is required");
				return;
			}
			await createTemplate({
				body: {
					...templateCreateData,
				}
			}).unwrap();
			setIsSaving(false);
			onTemplateSaved(templateCreateData);
			onClose();
		} catch (error: any) {
			const errorMessage = parseQueryError(error);
			setError(errorMessage);
		}
	};

	if (!isOpen) return null;


	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setTemplateCreateData({
			...templateCreateData,
			[name]: name === 'numberOfQuestions' || name === 'numberOfOptions'
				? parseInt(value, 10)
				: name === 'difficulty'
					? value as PracticeDifficulty || "easy"
					: value,
		});
	};

	const handleAddTag = () => {
		if (!newTag.trim()) {
			setError("Tag cannot be empty");
			return;
		}
		if (templateCreateData.tags.includes(newTag.trim())) {
			setError("Tag already exists");
			return;
		}
		setTemplateCreateData({
			...templateCreateData,
			tags: [...templateCreateData.tags, newTag.trim()]
		});
		setNewTag('');
	};

	const handleRemoveTag = (tag: string) => {
		setTemplateCreateData({
			...templateCreateData,
			tags: templateCreateData.tags.filter(t => t !== tag)
		});
	};

	const handleAddOutline = () => {
		if (!newOutline.trim()) {
			setError("Outline cannot be empty");
			return;
		}
		setTemplateCreateData({
			...templateCreateData,
			outlines: [...templateCreateData.outlines, newOutline.trim()]
		});
		setNewOutline('');
	};

	const handleRemoveOutline = (index: number) => {
		setTemplateCreateData({
			...templateCreateData,
			outlines: templateCreateData.outlines.filter((_, i) => i !== index)
		});
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
				<div className="flex justify-between items-center p-4 border-b">
					<h2 className="text-xl font-bold text-primary">Save as Template</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<XCircle size={24} />
					</button>
				</div>

				{isSaving && (
					<div className="flex items-center justify-center p-4">
						<svg className="animate-spin h-5 w-5 text-primary" viewBox="0 0 24 24">
							<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
							<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm2.5-1h9a2.5 2.5 0 1 1-5 0h-4a2.5 2.5 0 0 1-4.5-1z"></path>
						</svg>
						<span className="ml-2 text-gray-500">Saving...</span>
					</div>
				)}

				<form
					onSubmit={handleSaveTemplateConfirm}
					className={`flex-1 overflow-auto ${isSaving
						? 'opacity-50 pointer-events-none'
						: ''
						}`}
				>
					<div className="p-4 space-y-4">
						<div>
							<label htmlFor="templateName" className="block text-sm font-medium text-gray-700 mb-1">
								Template Name *
							</label>
							<input
								type="text"
								id="templateName"
								value={templateCreateData.name}
								onChange={(e) => setTemplateCreateData({
									...templateCreateData,
									name: e.target.value
								})}
								className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
								placeholder="Enter a name for this template"
								required
							/>
						</div>

						{/* Read-only test information */}
						<div className="bg-primary-toned-50 p-4 rounded-md border border-primary-toned-200">
							<h3 className="font-medium text-primary-toned-800 mb-2">Test Information</h3>
							<div className="space-y-2">
								<div>
									<span className="text-sm font-medium text-gray-500">Title:</span>
									<p className="text-gray-800">{initializeTemplateCreateData.title}</p>
								</div>
								<div>
									<span className="text-sm font-medium text-gray-500">Description:</span>
									<p className="text-gray-800">{initializeTemplateCreateData.description}</p>
								</div>
							</div>
							<p className="mt-2 text-xs text-primary-toned-600">
								These details are taken from your test and will be used in the template.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div>
								<label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
									Difficulty
								</label>
								<select
									id="difficulty"
									name="difficulty"
									value={initializeTemplateCreateData.difficulty}
									onChange={handleInputChange}
									className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
								>
									<option value={"easy"}>Easy</option>
									<option value={"medium"}>Medium</option>
									<option value={"hard"}>Hard</option>
								</select>
							</div>

							<div>
								<label htmlFor="numberOfQuestions" className="block text-sm font-medium text-gray-700 mb-1">
									Questions
								</label>
								<input
									type="number"
									id="numberOfQuestions"
									name="numberOfQuestions"
									value={initializeTemplateCreateData.numberOfQuestions}
									onChange={handleInputChange}
									min={1}
									max={100}
									className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
								/>
							</div>

							<div>
								<label htmlFor="numberOfOptions" className="block text-sm font-medium text-gray-700 mb-1">
									Options
								</label>
								<input
									type="number"
									id="numberOfOptions"
									name="numberOfOptions"
									value={initializeTemplateCreateData.numberOfOptions}
									onChange={handleInputChange}
									min={2}
									max={6}
									className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Tags
							</label>
							<div className="flex flex-wrap gap-1 mb-2">
								{initializeTemplateCreateData.tags.map((tag, index) => (
									<span
										key={index}
										className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-toned-100 text-primary"
									>
										{tag}
										<button
											type="button"
											onClick={() => handleRemoveTag(tag)}
											className="ml-1 text-primary-toned-600 hover:text-primary"
										>
											<X size={14} />
										</button>
									</span>
								))}
							</div>
							<div className="flex">
								<input
									type="text"
									value={newTag}
									onChange={(e) => setNewTag(e.target.value)}
									className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
									placeholder="Add a tag..."
									onKeyPress={(e) => {
										if (e.key === 'Enter') {
											e.preventDefault();
											handleAddTag();
										}
									}}
								/>
								<button
									type="button"
									onClick={handleAddTag}
									className="px-3 py-2 bg-primary text-white rounded-r-md hover:bg-primary-toned-700 flex items-center"
								>
									<Plus size={16} />
								</button>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Topics/Outlines
							</label>
							<div className="space-y-2 mb-2">
								{initializeTemplateCreateData.outlines.length === 0 ? (
									<div className="p-2 bg-gray-50 text-gray-500 text-sm text-center rounded-md border border-gray-200">
										No outlines added yet
									</div>
								) : (
									initializeTemplateCreateData.outlines.map((outline, index) => (
										<div
											key={index}
											className="p-2 border border-gray-200 rounded-md bg-gray-50 relative pr-8"
										>
											<button
												type="button"
												className="absolute top-2 right-2 text-red-500 hover:text-red-700"
												onClick={() => handleRemoveOutline(index)}
											>
												×
											</button>
											<p className="text-sm">{outline}</p>
										</div>
									))
								)}
							</div>
							<div className="flex">
								<input
									type="text"
									value={newOutline}
									onChange={(e) => setNewOutline(e.target.value)}
									className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
									placeholder="Add an outline..."
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											e.preventDefault();
											handleAddOutline();
										}
									}}
								/>
								<button
									type="button"
									onClick={handleAddOutline}
									className="px-3 py-2 bg-primary text-white rounded-r-md hover:bg-primary-toned-700 flex items-center"
								>
									<Plus size={16} />
								</button>
							</div>
						</div>
					</div>

					<div className="p-4 bg-gray-50 border-t">
						<p className="text-sm text-gray-500">
							* All fields are required. Please ensure that the template name is unique.
						</p>
						<p className="text-xs text-gray-400 mt-1">
							Note: The template will be saved with the current test details.
							You can edit the template later.
						</p>
						{error && (
							<div className="text-red-500 text-sm mb-2">
								<X size={16} className="inline mr-1" />
								{error}
							</div>
						)}
					</div>

					<div className="p-4 border-t flex justify-end gap-2">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-toned-700 flex items-center gap-2"
							disabled={error !== null || isSaving}
						>
							<Save size={18} />
							Save Template
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SaveTemplateDialog;