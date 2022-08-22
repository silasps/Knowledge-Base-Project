# Knowledge-Base-Project
 This project aims to explore all the knowledge acquired during the first part of the first DEVinHouse module of the Sesi Senai institution.
 
Below are the project prerequisites.
 
M1P1 Software House Ltd is hiring new developers for its staff, in order to expand the business. Managers understand that with the arrival of new employees, it will be necessary to carry out a continuous onboarding so that everyone stays on the same page. For this, the creation of a Knowledge Base system was requested, with the objective of keeping the tips and standardization of programming in a single place of easy access for all. It's time to be happy that you were chosen to create DEVinKnowledge.

The application that must be carried out individually must meet the following requirements:
1. A title in the browser tab, so that the user can find your application in the middle of the various tabs that it constantly keeps open;
2. A header within the page, so that the user can easily know which page they are on and what the content is about;
3. A form for the user to register the tip, containing:
 * Title:
    * Fill: Mandatory
    * Field type: Input
    * Minimum characters: 8
    * Maximum characters: 64
 * Language/Skill:
    * Fill: Mandatory
    * Field type: Input
    * Minimum characters: 4
    * Maximum characters: 16
 * Category:
    * Fill: Mandatory
    * Field type: Input Dropdown
    * Pre-Registered: FrontEnd, BackEnd, FullStack and Behavioral/Soft
 * Description:
    * Fill: Mandatory
    * Field type: Input Text Area
    * Minimum characters: 32
    * Maximum characters: 512
 *YouTube Video:
    * Padding: Optional
    * Field type: Input
    * Characters: Validate URL
 * Action buttons:
    * Save button to register if the rules are met
    * Clear button to clear form fields
4. Indicative cards that show the user the system statistics. They must present the total number of registered tips and the number of tips for each category.
5. A search bar so that the user can search for a tip through its title. Search and clear buttons can be used.
6. A list of tips containing all the information registered.
 * Use cards to group information
 * Add button to delete the tip
 * Add button to edit the tip
    * Idea: When clicked, you can load the registration form for editing, facilitating system coding.
 * Add button to open video with hint
    * Idea: When there is no video registered, the button may disappear from the card.
7. Using the alert to inform the actions performed. For example: Registered Tip, Deleted Tip and etc.
8. Confirmation messages, via confirm for the actions performed. For example: "Do you really want to delete this tooltip?"
9. Programming logic for manipulating data inserted into a json array with saving in localStorage (or json-server if necessary)


The image below shows the application screen.


![Screen Shot 2022-08-14 at 3 30 00 PM](https://user-images.githubusercontent.com/77552461/184550951-42db1068-21ff-436d-99f9-ca04c78cf60f.png)

This flow chart below shows how the application works in frontend and backend.

![Screen Shot 2022-08-16 at 11 59 56 AM](https://user-images.githubusercontent.com/77552461/184913959-6aad6713-7485-4c52-b59a-9a5ddd9baeab.png)
