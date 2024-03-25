"use client";

import { IssuesContext } from "@/hooks/Issues.hook";
import { Issue, State } from "@/models/Issue.model";
import { useContext, useEffect, useState } from "react";

import { FaRegDotCircle } from "react-icons/fa";
import { IoCheckmarkSharp } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
import { DateToRelativeTime } from "@/utils/DateToRelativeTime";

const IssuesTable = () => {
  const { issues } = useContext(IssuesContext);
  const [openCount, setOpenCount] = useState<number>(0);
  const [ sortItems ] = useState<string[]>([
    'Author',
    'Label',
    'Projects',
    'Milestone',
    'Assignee',
    'Sort',
  ]);

  useEffect(() => {
    const openIssuesCount = issues.reduce((count, issue) => {
      return issue.state === State.Open ? count + 1 : count;
    }, 0);

    setOpenCount(openIssuesCount);
  }, [issues]);

  return (
    <div className="flex flex-col max-h-[500px] overflow-scroll">
      <div className="bg-gray-50 flex justify-between p-4 bg-[#2e333b] sticky top-0">
        <div className="flex gap-3 uppercase text-sm">
          <div className="flex gap-2 items-center"><FaRegDotCircle /> {openCount} Open</div>
          <div className="flex gap-2 items-center"><IoCheckmarkSharp /> {issues.length - openCount} Closed</div>
        </div>

        <div className="flex gap-6 text-sm text-white/80">
          { sortItems.map((item, index) => (
            <div 
              key={index} 
              className="flex gap-1 items-center cursor-pointer hover:text-white"
              >{item} <MdArrowDropDown /></div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {issues.map((issue: Issue) => (
          <div key={issue.id} className="flex items-center hover:bg-[#23272e] bg-[#23272e]/90 p-4">
            <div className="flex-1 flex flex-col gap-1">
                <p className="hover:text-[#478BE6] cursor-pointer whitespace-no-wrap w-fit">{issue.title}</p>
                <p className="text-xs">#{issue.number} opened {DateToRelativeTime( issue.created_at )} by <span className="hover:text-[#478BE6] cursor-pointer">{issue.user.login}</span></p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <FaRegMessage />
              <p className="text-white/60">{issue.comments}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssuesTable;