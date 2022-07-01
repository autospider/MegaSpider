# -*- coding: utf-8 -*-
import os
import sys
import asyncio


async def startApi():
    iProc = await asyncio.create_subprocess_exec(
        sys.executable, '-u', f'{os.getcwd()}/api.py')
    await iProc.wait()


async def startDownloader():
    iProc = await asyncio.create_subprocess_exec(
        sys.executable, '-u', f'{os.getcwd()}/downloader.py')
    await iProc.wait()


async def startExtractor():
    iProc = await asyncio.create_subprocess_exec(
        sys.executable, '-u', f'{os.getcwd()}/extractor.py')
    await iProc.wait()


def main():
    iList = [startExtractor(), startDownloader(), startApi()]
    asyncio.run(asyncio.wait(iList))


if __name__ == '__main__':
    main()
