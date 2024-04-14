# Coding Convention

## Naming Convention

- **File Name:** Camel case.
- **Variable:** Camel case.
- **Function, Method, Class:** Pascal case.
- **CSS class:** BEM.
- **Get branch:** Snake case.

## JsonResult

Always include `success` property and `data` property. ( Can have other prop if needed ) 

*Example:*  

```
{
   "success": true,
   "data": [],
}
```

## Commment
**Functionality Description:** Place comments at the beginning of each function or method to desribe its functionality. 
**Explanation of Complex Logic:** If there is complex logic or a special algorithm, add comments to explain how it work. 
**Variable:** Add comments beside important variables to explain their meaning and usage. 
`TODO` comments to remind the team about tasks that need to be completed.
`FIXME` comments to indicate issues that need fixing. 

## Workflow
- **Trello ticket:** to do -> doing -> code review -> testing -> done.
- **Code review:** Tâm -> Quang, Quang -> Quân, Quân -> Sang, Sang -> Quốc, Quốc -> Tâm. (Code reviewers are also testers).
   - Tag person who review your code on group along with link to the pull request.
   - Code is only merged after approved.
- **Git:**
   - Commit messages should be descriptive and follow the following format for clarity and traceability: `<your name>_<action>`.
   - If a member develops special functionalities, they should create a new branch using the format `<member name>_<functionality>`.
   - All completed functionalities will be merged into the main branch, which contains the latest version of the project.
   - Member should pull new code everyday.
