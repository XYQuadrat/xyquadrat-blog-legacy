---
layout: post
title: Getting PHP to work in subfolders with nginx
---

If you have `nginx` as your reverse proxy of choice (like I do) and you for one reason or the other have to run PHP code on your website, you might have a configuration in your nginx config file like this:

```nginx
location ~ \.php$ {
    include /etc/nginx/snippets/fastcgi-php.conf;
    # or php7.x if you use old versions of PHP
    fastcgi_pass unix:/run/php/php8.0-fpm.sock; 
}
```
which works nice and dandy as long as your PHP code is not in a subfolder. But that occurs fairly often, and when it happens, the .php file won't get passed to `php-fpm` and thus only displays as a text file. Not nice. To correct this, you can just have another similar block nested inside the subfolder config block, like this:

```nginx
location ~ /subfolder/ {
    root /folderroot;

    location ~ \.php$ {
        include /etc/nginx/snippets/fastcgi-php.conf;
        fastcgi_param SCRIPT_FILENAME $request_filename;
        # or php7.x if you use old versions of PHP
        fastcgi_pass unix:/run/php/php8.0-fpm.sock;
    }
}
```

and that should make PHP work in these subfolders too, because `php-fpm` will correctly pick up those requests. How delightful (or not, depending on your stance towards PHP).