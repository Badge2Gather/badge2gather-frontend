'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, Download, GridIcon, List, LogOut, Search, Share2, User, Copy, Mail, Facebook, Twitter, Linkedin, MoreVertical, Settings, LightbulbIcon, MoonIcon, Menu, ChevronLeft, ChevronRight, Tag } from 'lucide-react'

// 샘플 인증서 데이터
const initialCertificates = [
  { id: 1, title: "오픈소스 기여상", description: "GitHub 오픈소스 프로젝트 기여", issuer: "GitHub", date: "2023-05-15", image: "/placeholder.svg?height=100&width=100", status: "valid", tags: ["기술", "오픈소스"], isPublic: false },
  { id: 2, title: "커뮤니티 리더십 인증", description: "지역 개발자 모임 운영", issuer: "Dev Community", date: "2023-06-20", image: "/placeholder.svg?height=100&width=100", status: "valid", tags: ["커뮤니티", "리더십"], isPublic: true },
  { id: 3, title: "해커톤 우승", description: "AI 혁신 해커톤 1등", issuer: "Tech Innovators", date: "2023-07-10", image: "/placeholder.svg?height=100&width=100", status: "valid", tags: ["기술", "AI", "해커톤"], isPublic: false },
  { id: 4, title: "온라인 교육 수료증", description: "머신러닝 기초 과정 수료", issuer: "Coursera", date: "2023-04-05", image: "/placeholder.svg?height=100&width=100", status: "expired", tags: ["교육", "머신러닝"], isPublic: true },
]

export function CertificateManagementComponent() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [certificates, setCertificates] = useState(initialCertificates)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    const root = window.document.documentElement
    if (isDarkMode) {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev)
  }

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const handlePublishCertificates = () => {
    console.log("인증서 목록 공개하기 버튼이 클릭되었습니다.");
    // TODO: 실제 공개 로직 구현
  }

  const filteredCertificates = certificates.filter(cert => 
    selectedTags.length === 0 || selectedTags.some(tag => cert.tags.includes(tag))
  )

  const handleDownload = (format: string) => {
    console.log(`Downloading certificate in ${format} format`)
  }

  const handleShare = (platform: string) => {
    console.log(`Sharing certificate on ${platform}`)
  }

  const handleTogglePublic = (id: number) => {
    setCertificates(prevCertificates => 
      prevCertificates.map(cert => 
        cert.id === id ? { ...cert, isPublic: !cert.isPublic } : cert
      )
    )
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
      {/* 헤더 */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
              <Menu className="h-6 w-6" />
            </Button>
            <nav className="flex space-x-4">
              <a className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" href="/">홈</a>
              <a className="text-blue-600 dark:text-blue-400" href="/certificates">인증서</a>
              <a className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400" href="/communities">커뮤니티</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Input className="w-64 bg-gray-100 dark:bg-gray-700" placeholder="인증서 검색..." type="search" />
            <Button variant="outline" onClick={handlePublishCertificates} className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              인증서 목록 공개하기
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">설정 메뉴 열기</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 shadow-lg rounded-md">
                <DropdownMenuItem onClick={toggleDarkMode} className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  {isDarkMode ? <LightbulbIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
                  <span>{isDarkMode ? '라이트 모드' : '다크 모드'}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="사용자 아바타" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 shadow-lg rounded-md" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">사용자명</p>
                    <p className="text-xs leading-none text-gray-500 dark:text-gray-400">user@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <User className="h-4 w-4" />
                  <span>프로필</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <LogOut className="h-4 w-4" />
                  <span>로그아웃</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex-1 flex">
        {/* 사이드바 */}
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 ease-in-out mr-8 flex flex-col`}>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="self-end mb-4">
            {isSidebarOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
          </Button>
          <ScrollArea className="flex-grow">
            {isSidebarOpen ? (
              <div className="space-y-6">
                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">카테고리</h4>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full bg-white dark:bg-gray-700">
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-700">
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="tech">기술</SelectItem>
                      <SelectItem value="community">커뮤니티</SelectItem>
                      <SelectItem value="education">교육</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">정렬</h4>
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-full bg-white dark:bg-gray-700">
                      <SelectValue placeholder="정렬 기준" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-700">
                      <SelectItem value="newest">최신순</SelectItem>
                      <SelectItem value="oldest">오래된순</SelectItem>
                      <SelectItem value="name">이름순</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">태그</h4>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(certificates.flatMap(cert => cert.tags))).map(tag => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        onClick={() => handleTagSelect(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <GridIcon className="h-6 w-6" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>카테고리</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <List className="h-6 w-6" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>정렬</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Tag className="h-6 w-6" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>태그</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </ScrollArea>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">내 인증서</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={() => setViewMode('grid')} className={`${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white dark:bg-gray-700'}`}>
                <GridIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setViewMode('list')} className={`${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white dark:bg-gray-700'}`}>
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Separator className="my-6" />
          {viewMode === 'list' ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">제목</TableHead>
                  <TableHead className="text-left">발급처</TableHead>
                  <TableHead className="text-left">발급일</TableHead>
                  <TableHead className="text-left">상태</TableHead>
                  <TableHead className="text-left">공개 여부</TableHead>
                  <TableHead className="text-right">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCertificates.map((cert) => (
                  <TableRow key={cert.id} className="border-b dark:border-gray-700">
                    <TableCell className="font-medium">{cert.title}</TableCell>
                    <TableCell>{cert.issuer}</TableCell>
                    <TableCell>{cert.date}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className={`w-3 h-3 rounded-full ${cert.status === 'valid' ? 'bg-green-500' : 'bg-red-500'}`} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{cert.status === 'valid' ? '유효' : '만료'}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <Switch
                        id={`public-toggle-${cert.id}`}
                        checked={cert.isPublic}
                        onCheckedChange={() => handleTogglePublic(cert.id)}
                        className={`${cert.isPublic ? 'bg-blue-600' : 'bg-gray-200'} dark:bg-gray-700`}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">메뉴 열기</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800">
                          <DropdownMenuItem onSelect={() => handleDownload('pdf')} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            PDF로 다운로드
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => handleShare('email')} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            이메일로 공유
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Dialog>
                              <DialogTrigger asChild>
                                <span>상세 정보</span>
                              </DialogTrigger>
                              <DialogContent className="bg-white dark:bg-gray-800">
                                <DialogHeader>
                                  <DialogTitle>{cert.title}</DialogTitle>
                                  <DialogDescription>{cert.description}</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <img src={cert.image} alt={cert.title} className="w-full rounded-lg" />
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <p className="text-sm font-medium">발급처:</p>
                                    <p className="col-span-3 text-sm">{cert.issuer}</p>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <p className="text-sm font-medium">발급일:</p>
                                    <p className="col-span-3 text-sm">{cert.date}</p>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <p className="text-sm font-medium">상태:</p>
                                    <div className={`w-3 h-3 rounded-full ${cert.status === 'valid' ? 'bg-green-500' : 'bg-red-500'}`} />
                                    <p className="col-span-2 text-sm">{cert.status === 'valid' ? '유효' : '만료'}</p>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {cert.tags.map(tag => (
                                      <Badge key={tag} variant="secondary" className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">{tag}</Badge>
                                    ))}
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCertificates.map((cert) => (
                <div key={cert.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img src={cert.image} alt={cert.title} className="h-12 w-12 rounded-full" />
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">{cert.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{cert.description}</p>
                    <div className="flex items-center justify-between">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className={`w-3 h-3 rounded-full ${cert.status === 'valid' ? 'bg-green-500' : 'bg-red-500'}`} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{cert.status === 'valid' ? '유효' : '만료'}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`public-toggle-${cert.id}`}
                          checked={cert.isPublic}
                          onCheckedChange={() => handleTogglePublic(cert.id)}
                          className={`${cert.isPublic ? 'bg-blue-600' : 'bg-gray-200'} dark:bg-gray-700`}
                        />
                        <Label htmlFor={`public-toggle-${cert.id}`} className="text-sm text-gray-600 dark:text-gray-400">
                          {cert.isPublic ? '공개' : '비공개'}
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* 푸터 */}
      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 md:text-left">
            © 2023 인증서 관리 서비스. 모든 권리 보유.
          </p>
        </div>
      </footer>
    </div>
  )
}