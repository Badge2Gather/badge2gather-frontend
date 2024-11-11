/** @type {import('next').NextConfig} */
const nextConfig = {
    // 빌드 시 ESLint 검사 비활성화
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
