Creative Commons Chooser (plugin for Omeka)
===========================================

[Creative Commons Chooser] is a plugin for the [Omeka] platform that adds a
[Creative Commons] License Chooser to the admin interface and extends Omeka
items to be associated with individual CC licenses.


Installation
------------

Unzip [Creative Commons Chooser] into the plugin directory, rename the folder
"CreativeCommonsChooser" if needed, then install it from the settings panel.

The selected licence for an item is automatically appended to items/show pages
and it can be themed.

A helper (`ccWidget()`) and a shortcode are available too, if needed. The
shortcode should be written like this:

- Short for the current item: `[cc]`
- Long for any item: `[cc item_id=1]`
- Long for any item, with `display` option (can be "image" (default), "text" or
"both") and `title` option ("true" or "false" (default)): `[cc item_id=1 display=text title=false]`


Warning
-------

Use it at your own risk.

It's always recommended to backup your files and database regularly so you can
roll back if needed.


Troubleshooting
---------------

See online the [plugin issues] page on GitHub.


License
-------

This plugin is published under [GNU/GPL].

This program is free software; you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation; either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
details.

You should have received a copy of the GNU General Public License along with
this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.


This plugin contains the Creative Commons library with another free and open
source licence. See `views/shared/javascripts` folder.


Contact
-------

Current maintainers:

* Daniel Berthereau (see [Daniel-KM])

First version of this plugin has been built by [Alexandria Archive Institute],
African Commons, and the [UC Berkeley School of Information], Information and
Service Design Program.


Copyright
---------

* Copyright Alexandria Archive Institute and the UC Berkeley School of Information, 2009
* Copyright Daniel Berthereau, 2015

See copyrights for the Creative Commons library inside `views/shared/javascripts`
folder.


[Creative Commons Chooser]: https://github.com/Daniel-KM/CreativeCommonsChooser
[Omeka]: https://omeka.org
[Creative Commons]: https://creativecommons.org
[plugin issues]: https://github.com/Daniel-KM/CreativeCommonsChooser/issues
[GNU/GPL]: https://www.gnu.org/licenses/gpl-3.0.html
[Daniel-KM]: https://github.com/Daniel-KM "Daniel Berthereau"
[Alexandria Archive Institute]: http://alexandriaarchive.org
[UC Berkeley School of Information]: http://www.ischool.berkeley.edu
