import os
import re
import sys
import shutil

def main(splitFile, outputPath):
    dir_path = outputPath
    splitFilePath = outputPath + "\\" + splitFile

    # 清空 docs 目录，保留README2文件
    for filename in os.listdir(dir_path):
        file_path = os.path.join(dir_path, filename)
        if os.path.isfile(file_path):
            if filename == splitFile:
                continue
            else:
                os.remove(file_path)

    # 读取 Markdown 文件
    with open(splitFilePath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 切分 Markdown 文件
    sections = re.split(r'(?m)^#\s+', content)[1:]

    # 创建文件夹，用于存放切分后的文件
    os.makedirs(dir_path, exist_ok=True)

    # 遍历切分后的内容，生成多个文件
    for i, section in enumerate(sections):
        # 获取标题
        title = section.split('\n')[0].strip()

        # 获取文件名
        filename = dir_path + "\\" + f'{i:02d}_'

        # 如果找到注释，使用注释中的内容作为文件名
        match = re.search(r'^\s*<!--\s*(.*?)\s*-->\s*$', section, re.DOTALL | re.MULTILINE)
        if match:
            filename += f'{match.group(1)}'
            # 移除注释部分
            section = re.sub(r'^\s*<!--.*?-->\s*$', '', section, flags=re.DOTALL | re.MULTILINE)
        else:
            filename += f'{title}'

        filename += '.md'

        # 将内容写入文件
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(f'# {section}')

if __name__ == "__main__":
    splitFile = "README2.md"
    outputPath = os.path.normpath(os.getcwd() + "\\..\\guide\\zh");
    main(splitFile, outputPath)
    print("split complete: " + outputPath+"\\"+splitFile)
