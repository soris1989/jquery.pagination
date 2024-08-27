<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>pagination tutorial</title>

    <!-- Bootstrap core-->
    <link type="text/css" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" />
    <!-- Custom tyles -->
    <link type="text/css" rel="stylesheet" href="./public/css/style.css?v=<?= time() ?>" />
</head>

<body>
    <div class="d-flex align-items-center">
        <div class="pagination"></div>
        <div class="ms-3">
            <select name="page_sizes" id="page-sizes">
                <option value="5">5</option>
                <option value="10" selected>10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    </div>

    <div id="results"></div>

    <!-- Jquery -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <!-- Bootstrap 5 -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Pagination.js -->
    <script type="text/javascript" src="./public/js/jquery.pagination.js?v=<?= time() ?>"></script>
    <!-- Custom script -->
    <script type="text/javascript" src="./public/js/index.js?v=<?= time() ?>"></script>
</body>

</html>