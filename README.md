# MentorMe
## Step 1:
Go to the command line prompt and enter the below command:
```
npm install -g json-server
```
## Step 2: 
Run json-server
```
npx json-server --watch data.json --port 3000
```
## Step 3: open http://127.0.0.1:5500/home.html
## Note: If you receive errors about permission:
1. Open PowerShell as Administrator: Search for PowerShell in the Start menu.
2. Right-click on it and select "Run as administrator".
3. Check Current Execution Policy: Run the following command to see the current policy:
```
Get-ExecutionPolicy
```
If it returns Restricted, PowerShell prevents all scripts from running.
4. Change the Execution Policy: To temporarily change the execution policy to allow scripts, use the following command:
```
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```
This command sets the policy to Bypass for the current PowerShell session only. It means that nothing is blocked and there are no warnings or prompts during this session. This change is temporary and only applies to the current session.
