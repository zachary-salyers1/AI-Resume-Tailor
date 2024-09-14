"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, Search, Briefcase, FileText, Sparkles, BookmarkPlus, Trash2 } from "lucide-react"

export function ModernResumeJobSearch() {
  const [resume, setResume] = useState<File | null>(null)
  const [jobSearch, setJobSearch] = useState("")
  const [jobResults, setJobResults] = useState<string[]>([])
  const [selectedJob, setSelectedJob] = useState("")
  const [tailoredResume, setTailoredResume] = useState("")
  const [savedJobs, setSavedJobs] = useState<string[]>([])

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setResume(file)
    }
  }

  const handleJobSearch = () => {
    setJobResults([
      "Software Engineer at TechCorp",
      "Frontend Developer at WebSolutions",
      "Full Stack Developer at InnovateTech",
      "React Developer at AppMakers",
      "JavaScript Engineer at CodeCrafters",
    ])
  }

  const handleJobSelect = (job: string) => {
    setSelectedJob(job)
  }

  const handleTailorResume = () => {
    setTailoredResume(`Tailored resume for ${selectedJob}:\n\nYour resume has been optimized to highlight skills and experiences relevant to this position.`)
  }

  const handleSaveJob = (job: string) => {
    if (!savedJobs.includes(job)) {
      setSavedJobs([...savedJobs, job])
    }
  }

  const handleRemoveSavedJob = (job: string) => {
    setSavedJobs(savedJobs.filter(savedJob => savedJob !== job))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-sky-500">
          Resume Job Search Assistant
        </h1>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-4 rounded-xl bg-gray-800 p-1">
            <TabsTrigger value="upload" className="rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-200">
              Upload Resume
            </TabsTrigger>
            <TabsTrigger value="search" className="rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-200">
              Search Jobs
            </TabsTrigger>
            <TabsTrigger value="saved" className="rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-200">
              Saved Jobs
            </TabsTrigger>
            <TabsTrigger value="tailor" className="rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-200">
              Tailor Resume
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <Card className="mt-6 bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-100">Upload Your Resume</CardTitle>
                <CardDescription className="text-gray-300">Upload your resume to get started with your job search.</CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="resume-upload" className="cursor-pointer">
                  <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center transition-all hover:border-sky-400">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <span className="mt-4 block text-sm font-semibold text-gray-300">
                      Click to upload or drag and drop
                    </span>
                    <span className="mt-2 block text-xs text-gray-400">PDF, DOC, DOCX up to 10MB</span>
                  </div>
                  <Input
                    id="resume-upload"
                    type="file"
                    className="hidden"
                    onChange={handleResumeUpload}
                    accept=".pdf,.doc,.docx"
                  />
                </Label>
              </CardContent>
              <CardFooter>
                {resume && <p className="text-sm text-gray-300">Uploaded: {resume.name}</p>}
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="search">
            <Card className="mt-6 bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-100">Search for Jobs</CardTitle>
                <CardDescription className="text-gray-300">Enter keywords to find relevant job listings.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter job title, skills, or company"
                    value={jobSearch}
                    onChange={(e) => setJobSearch(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                  />
                  <Button onClick={handleJobSearch} className="bg-sky-500 hover:bg-sky-600 text-gray-100">
                    <Search className="mr-2 h-4 w-4" /> Search
                  </Button>
                </div>
                <ScrollArea className="h-[300px] mt-6 rounded-lg bg-gray-700 p-4">
                  {jobResults.map((job, index) => (
                    <div
                      key={index}
                      className="p-3 hover:bg-gray-600 cursor-pointer rounded-lg mb-2 transition-all text-gray-200 flex justify-between items-center"
                    >
                      <div onClick={() => handleJobSelect(job)}>
                        <Briefcase className="inline-block mr-2 h-4 w-4 text-sky-400" />
                        {job}
                      </div>
                      <Button
                        onClick={() => handleSaveJob(job)}
                        variant="ghost"
                        size="sm"
                        className="text-sky-400 hover:text-sky-300"
                      >
                        <BookmarkPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="saved">
            <Card className="mt-6 bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-100">Saved Jobs</CardTitle>
                <CardDescription className="text-gray-300">View and manage your saved job listings.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] mt-6 rounded-lg bg-gray-700 p-4">
                  {savedJobs.length > 0 ? (
                    savedJobs.map((job, index) => (
                      <div
                        key={index}
                        className="p-3 hover:bg-gray-600 cursor-pointer rounded-lg mb-2 transition-all text-gray-200 flex justify-between items-center"
                      >
                        <div onClick={() => handleJobSelect(job)}>
                          <Briefcase className="inline-block mr-2 h-4 w-4 text-sky-400" />
                          {job}
                        </div>
                        <Button
                          onClick={() => handleRemoveSavedJob(job)}
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center">No saved jobs yet. Start saving jobs from the search results!</p>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tailor">
            <Card className="mt-6 bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-100">Tailor Your Resume</CardTitle>
                <CardDescription className="text-gray-300">Use AI to optimize your resume for the selected job.</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedJob ? (
                  <>
                    <p className="mb-4 text-lg font-semibold text-sky-400">Selected Job: {selectedJob}</p>
                    <Button onClick={handleTailorResume} className="bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-500 hover:to-sky-700 text-gray-100">
                      <Sparkles className="mr-2 h-4 w-4" /> Tailor Resume with AI
                    </Button>
                    {tailoredResume && (
                      <Textarea
                        className="mt-6 bg-gray-700 border-gray-600 text-gray-100"
                        value={tailoredResume}
                        rows={10}
                        readOnly
                      />
                    )}
                  </>
                ) : (
                  <p className="text-gray-300">Please select a job from the search results or saved jobs first.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}